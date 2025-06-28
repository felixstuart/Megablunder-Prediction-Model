# Megablunder Classifier 


![](./Demo.mov)

## Project Description

My high school teaches a set of eight grammatical errors known as Megablunders: pronoun reference (PR), sentence fragments (FRAG), pronoun case (CASE), dangling modifiers (DM), misplaced modifiers (MM), pronoun agreement (AGREE), run-on sentences (ROS), and parallelism (PAR). This repo contains a model (in the model directory) capable of identifying the errors, a server (in the server directory) to run a simple FastAPI service that can return the type of error using the model, and a simple Vite app that acts as a UI for the model and API. 

The model is a fine-tuned version of BERT, trained on a dataset of around 400 megablunders. The dataset is stored on Kaggle, and if you would like access please contact me.

## Running the API and Website

There are Docker images for both the website and API. Both of these can be run by using the following command: `docker-compose up --build`. The only thing needed for this is Docker and Docker Compose -- all the packages will get installed by the Dockerfiles. 

## Running the Notebook

While there is a Dockerfile included with the notebook, I would recommend running it on Kaggle or similar because 