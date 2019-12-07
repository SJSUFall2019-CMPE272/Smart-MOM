from models.extractive_summariser import *
from flask import Flask
from flask import request, jsonify
import spacy
from deepcorrect import DeepCorrect
from deepsegment import DeepSegment


app = Flask(__name__)
global corrector
global segmenter


def dataPreProcessModel():
    print("Inside dataPreProcessModel")
    global corrector
    corrector = DeepCorrect('model_params/deeppunct_params_en',
                            'model_params/deeppunct_checkpoint_google_news')
    global segmenter
    segmenter = DeepSegment('en')


@app.route('/summarize', methods=["POST"])
def summary():
    print("Inside Summarizer")
    data = request.get_json()
    result = inference(data['id'], corrector, segmenter)
    # print(result)
    return jsonify(result)


# @app.route('/entity', methods=["POST"])
# def entity():
#     print('Inside entity')
#     data = request.get_json()
#     doc = entityRecog(data['id'])
#     # result = []
#     # for entity in doc.ents:
#     #     # print(entity.text, entity.label_)
#     #     if entity.label_ == 'PERSON':
#     #         result.append(entity.text)

#     return jsonify(doc)

# @app.route('/sentiment',methods=["POST"])
# def sentiment_analysis():
#     data = request.get_json()
#     sentimentoutput = entityRecog(data['id'])
#     return jsonify(sentimentoutput)

if __name__ == '__main__':
    dataPreProcessModel()
    app.run(host='0.0.0.0', port=3000)
