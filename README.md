# Megablunder Classifier 


![](./Demo.mov)

## Description

My high school teaches a set of eight grammatical errors known as Megablunders: pronoun reference (PR), sentence fragments (FRAG), pronoun case (CASE), dangling modifiers (DM), misplaced modifiers (MM), pronoun agreement (AGREE), run-on sentences (ROS), and parallelism (PAR). 

This repository contains: 
- A fine-tuned BERT model (in /model) capable of identifying these 9 errors
- A simple FastAPI service (in /server) that allows the model to return predictions
- A Vite app (in /website) that provides a UI for which the model can be accessed

The model was trained on a dataset, which is stored on Kaggle, of around 400 megablunders. If you would like a link to the dataset, please contact me. 

## Usage

### Website & API

In order to run the website, all that you need is Docker and docker-compose. With both of these installed, you can run the docker-compose.yaml file using the following command: 

`docker-compose up --build`

This will install all the needed packages and run the Dockerfiles stored in the /server and /website directories. 

### Model

There is another Dockerfile in the /model directory that has everything needed to run the model; however, I would suggest running the notebook on Kaggle or similar because of the computing resources needed to fine-tune BERT.


## Resources 

- [Hugging Face Fine-Tuning Tutorial](https://huggingface.co/docs/transformers/en/training)
- [Isaac Wu's Megablunder Problem Creator](https://github.com/isaacwu2000/Megablunder-Problem-Creator)

## License

MIT License - see LICENSE file for details.