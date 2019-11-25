from pymongo import MongoClient


class MongoConnection():
    def __init__(self, connectionString, db_name):
        self.connectionString = connectionString
        self.db_name = db_name

    def connect(self):
        client = MongoClient(self.connectionString)
        database = client.get_database(self.db_name)
        return database


# db = client.get_database('PythonDB')
# records = db.Summary
# records.count_document({})
# #insert
# records.insert_one({"name": "Garg", "Age" : "23"})
# #insert_many
# records.insert_many({"name": "Garg", "Age" : "23"})

# #find
# print(list(records.find({"name":"Garg"})))
# #find_one
# print(list(records.find_one({"name":"Garg"})))

# #update
# records.update_one({"name": "Garg"}, {"$set": {"Age":24}})

# #delete
# records.delete_one({"name":"Amit"})


# def audioToTranscript(path):
    # connectionString = "mongodb+srv://root:root@summarizer-l0rhm.mongodb.net/test?retryWrites=true&w=majority"
    # db_name = "PythonDB"
    # records = conn(connectionString, db_name)
    # # print(records.find({}))
    # r = sr.Recognizer()
    # # harvard = sr.AudioFile('drive/My Drive/PythonRecordings/ENG_M.wav')

    # # wget.download(path, 'audio.mp3')
    # # f = urlretrieve(path, "audio.mp3")
    # harvard = sr.AudioFile("REC_40_Driving.wav")
    # # audio = f.read()
    # # harvard = sr.AudioFile(path)
    # with harvard as source:
    #     audio = r.record(source)

    # print(type(audio))
    # trans = r.recognize_google(audio)
    # resp = records.insert_one({
    #     "Transcript": trans,
    #     "AudioPath": path
    # })
    # print(resp)
    # return doc


# help(Summarizer)
