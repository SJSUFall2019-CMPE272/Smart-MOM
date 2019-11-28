from summarizer import Summarizer
import spacy
import os
import sys
# import speech_recognition as sr
import urllib
from urllib.request import urlretrieve
import wget
from bson.objectid import ObjectId
# from bson._get_array import Array
import datetime
# from bson.json_util import dumps
from deepcorrect import DeepCorrect
from textblob import TextBlob
# from deepsegment import DeepSegment


def preProcessTranscript(transcript, corrector):
    size = len(transcript)
    # if(size>600):
    #     i= size%600
    #     for
    data = ''.join(corrector.correct(
        transcript[i*200:min((size, (i+1)*200))])[0]['sequence'] for i in range(int(size/200)))
    # print("Inside preProcessTranscript")
    # print(data[0]['sequence'])
    # print("Exiting preProcessTranscript")
    # return data[0]['sequence']
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


def saveSummary(_id, result, transcriptid, username, length, meeting_sentiment, entities):
    database = conn()
    summaries = database.summaries
    res = summaries.insert_one({"text": result,
                                "transcriptid": ObjectId(transcriptid),
                                "username": username,
                                "time": datetime.datetime.utcnow(),
                                "sentiment": meeting_sentiment,
                                "entities": entities
                                })
    return res


def inference(_id, corrector):
    res = getBodyTopic(_id)
    # body, topic = res
    # print(res)
    body = res['text']
    topic = res['topic']
    username = res['username']
    length = res['length']
    body = preProcessTranscript(body, corrector)
    entities = entityRecog(_id)
    # topic = preProcessTranscript(topic)
    meeting_sentiment = sentiment(_id)
    # correct_sentence__test(body, corrector)
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
                      username, length, meeting_sentiment, entities)

    return {"_id": str(res.inserted_id)}


def entityRecog(_id):
    res = getBodyTopic(_id)
    # print(res)
    text = res['text']
    nlp = spacy.load("en_core_web_sm")
    # text = (
    # """Lori: Uhh, I came across this really funny website the other day… It’s, umm, designed to where people can anonymously send an e-mail to an annoying coworker…\n\nMichael: Mmm hmm…\n\nL: Saying things like, “You really need to use deodorant [laughter]…but we’re too shy to tell you”… and they, you know, you just put in their e-mail address…\n\nM: Okay\n\nL: Umm, and it got me thinking about annoying coworkers…\n\nM: Okay\n\nL: Can…Do you have any memories of particularly irritating and annoying people at work?""")
    doc = nlp(text)
    result = []
    for entity in doc.ents:
        # print(entity.text, entity.label_)
        if entity.label_ == 'PERSON':
            result.append(entity.text)
    # print("Noun phrases:", [chunk.text for chunk in doc.noun_chunks])
    # print("Verbs:", [token.lemma_ for token in doc if token.pos_ == "VERB"])
    return list(set(result))


def sentiment(_id):
    res = getBodyTopic(_id)
    # body, topic = res
    # print(res)
    body = res['text']
    obj = TextBlob(body)
    sentiment = obj.sentiment.polarity
    if sentiment == 0:
        return 'Neutral'
    elif sentiment > 0:
        return 'Positive'
    else:
        return 'Negative'


# def correct_sentence__test(data, corrector):

#     segmenter = DeepSegment('en', tf_serving=True)
#     chunk_size = 200  # read 600 character at a time
#     # for txt_file in os.listdir('input'):
#     output_data = ''
#     # f = open('input/{}'.format(txt_file),'r')

#     # data = f.read()
#     seg_data_arr = segmenter.segment_long(data)
#     for seg_data in seg_data_arr:
#         if len(seg_data) > chunk_size:
#             for chunk_str in chunkstring(seg_data, chunk_size):
#                 punt_data = corrector.correct(
#                     chunk_str)[0]['sequence']  # get corrected output
#                 output_data += ''.join(punt_data)
#         else:
#             punt_data = corrector.correct(
#                 seg_data)[0]['sequence']  # get corrected output
#             output_data += ''.join(punt_data)
#     print("Input Data:- ", data)
#     print("Output Data:- ", output_data)
#     print("Length of Input Data:- ", len(data))
#     print("Lenght of Output Data:- ", len(output_data))
