from models.extractive_summariser import *
from flask import Flask
from flask import request, jsonify
import spacy


app = Flask(__name__)


@app.route('/summarize', methods=["POST"])
def summary():
    data = request.get_json()
    result = inference(data['id'])
    # print(result)
    return jsonify(result)


@app.route('/entity', methods=["POST"])
def entity():
    data = request.get_json()
    doc = entityRecog(data['id'])
    result = []
    for entity in doc.ents:
        # print(entity.text, entity.label_)
        if entity.label_ == 'PERSON':
            result.append(entity.text)

    return jsonify(result)


# @app.route('/audioToTrans', methods=["POST"])
# def audio():
#     data = request.get_json()
#     # print(data['topic'])
#     path = data['path']
#     resp = audioToTranscript(path)
#     return jsonify(resp)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)
