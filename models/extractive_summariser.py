from summarizer import Summarizer
import spacy
import os
import sys
import speech_recognition as sr
import urllib
from urllib.request import urlretrieve
import wget
from bson.objectid import ObjectId
import datetime
from bson.json_util import dumps


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


def saveSummary(_id, result, text, topic, transcriptid, username, length):
    database = conn()
    summaries = database.summaries
    res = summaries.insert_one({"Summary": result,
                                "body": text,
                                "topic": topic,
                                "transcriptid": ObjectId(transcriptid),
                                "username": username,
                                "length": length,
                                "time": datetime.datetime.utcnow()
                                })
    return res


def inference(_id):
    res = getBodyTopic(_id)
    # body, topic = res
    # print(res)
    body = res['text']
    topic = res['topic']
    username = res['username']
    length = res['length']

    model = Summarizer()
    data = model.get_summary(body, topic)
    size = len(data)
    result = ""
    if size < length:
        result = [result + data[i]['sentence'] for i in range(len(data))]
    else:
        result = [result + data[i]['sentence'] for i in range(length)]

    result = " ".join(result)
    res = saveSummary(_id, result, body, topic, _id, username, length)

    return {"_id": str(res.inserted_id)}


def entityRecog(_id):
    res = getBodyTopic(_id)
    # print(res)
    text = res['text']
    nlp = spacy.load("en_core_web_sm")
    # text = (
    # """Lori: Uhh, I came across this really funny website the other day… It’s, umm, designed to where people can anonymously send an e-mail to an annoying coworker…\n\nMichael: Mmm hmm…\n\nL: Saying things like, “You really need to use deodorant [laughter]…but we’re too shy to tell you”… and they, you know, you just put in their e-mail address…\n\nM: Okay\n\nL: Umm, and it got me thinking about annoying coworkers…\n\nM: Okay\n\nL: Can…Do you have any memories of particularly irritating and annoying people at work?""")
    doc = nlp(text)

    # print("Noun phrases:", [chunk.text for chunk in doc.noun_chunks])
    # print("Verbs:", [token.lemma_ for token in doc if token.pos_ == "VERB"])
    return doc
