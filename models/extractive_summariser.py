from summarizer import Summarizer
import spacy
import os
import sys
import urllib
from urllib.request import urlretrieve
import wget
from bson.objectid import ObjectId
import datetime
from deepcorrect import DeepCorrect
from textblob import TextBlob
from deepsegment import DeepSegment


def chunkstring(string, length):
    return (string[0+i:length+i] for i in range(0, len(string), length))


def preProcessTranscript(transcript, corrector):
    size = len(transcript)
    data = ''.join(corrector.correct(
        transcript[i*200:min((size, (i+1)*200))])[0]['sequence'] for i in range(int(size/200)))
    return data


def conn():
    connectionString = "mongodb+srv://grubhub:password1234@firstcluster-2lwiw.mongodb.net/smart_mom?retryWrites=true&w=majority"
    db_name = "smart_mom"
    sys.path.append(os.path.abspath("../"))
    from dbconnection.connect import MongoConnection
    connection = MongoConnection(connectionString, db_name)
    database = connection.connect()
    return database


def getBodyTopic(_id):
    database = conn()
    res = database.transcripts.find_one({"_id": ObjectId(_id)})
    return res


def saveSummary(_id, result, transcriptid, username, length, meeting_sentiment, entities, topic):
    database = conn()
    summaries = database.summaries
    res = summaries.insert_one({"text": result,
                                "transcriptid": ObjectId(transcriptid),
                                "username": username,
                                "time": datetime.datetime.utcnow(),
                                "topic": topic,
                                "sentiment": meeting_sentiment,
                                "entities": entities
                                })
    return res


def inference(_id, corrector, segmenter):
    res = getBodyTopic(_id)
    body = res['text']
    topic = res['topic']
    username = res['username']
    length = res['length']
    # body = preProcessTranscript(body, corrector)
    entities = entityRecog(_id)
    # topic = preProcessTranscript(topic)
    meeting_sentiment = sentiment(_id)
    body = correct_sentence__test(body, corrector, segmenter)
    model = Summarizer()
    data = model.get_summary(body, topic)
    size = len(data)
    result = ""
    if size < length:
        result = [result + data[i]['sentence'] for i in range(len(data))]
    else:
        result = [result + data[i]['sentence'] for i in range(length)]

    result = " ".join(result)
    res = saveSummary(_id, result, _id,
                      username, length, meeting_sentiment, entities, topic)

    return {"_id": str(res.inserted_id)}


def entityRecog(_id):
    res = getBodyTopic(_id)
    text = res['text']
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(text)
    result = []
    for entity in doc.ents:
        if entity.label_ == 'PERSON':
            result.append(entity.text)
    return list(set(result))


def sentiment(_id):
    res = getBodyTopic(_id)
    body = res['text']
    obj = TextBlob(body)
    sentiment = obj.sentiment.polarity
    if sentiment == 0:
        return 'Neutral'
    elif sentiment > 0:
        return 'Positive'
    else:
        return 'Negative'


def correct_sentence__test(data, corrector, segmenter):
    chunk_size = 200  # read 600 character at a time
    output_data = ''
    seg_data_arr = segmenter.segment_long(data)
    for seg_data in seg_data_arr:
        print(seg_data)
        if len(seg_data) > chunk_size:
            for chunk_str in chunkstring(seg_data, chunk_size):
                punt_data = corrector.correct(
                    chunk_str)[0]['sequence']  # get corrected output
                output_data += ''.join(punt_data)
        else:
            punt_data = corrector.correct(
                seg_data)[0]['sequence']  # get corrected output
            output_data += ''.join(punt_data)
    print("Input Data:- ", data)
    print("Output Data:- ", output_data)
    print("Length of Input Data:- ", len(data))
    print("Lenght of Output Data:- ", len(output_data))
    return output_data
