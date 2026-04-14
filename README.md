# Overview


## Project Description

Asthma Tracker is a mobile application that assists individuals in managing their asthma by systematically logging and analyzing symptoms. The application leverages analytics and generative AI to provide users with actionable insights tailored to their logged data.


# Tech Stack


- Frontend: React Native(Expo)

- Authentication: Firebase Authentication

- Backend: Firestore, FastAPI, Pydantic Model

- AI Layer: OpenAI ChatGPT APIs

- Weather and Air Quality Data Layer: Weather API integration(Weather API)

- Visualization: Matplotlib and Victory Chart

- State Management: Global Context for symptom and mood states

# Installation

## Frontend

- Install Node.js LTS and Expo tooling

- Create Expo app

- Install Firebase SDK

- Install chart library

- Configure app environment variables for non-secret public config such as Firebase app config

## Backend

- Install Python 3.9+ and create venv
- Install FastAPI, Pydantic, OpenAI SDK, ASGI server
- Create .env
- Build routes for AI, weather, summaries, and chart export
- Add CORS if needed for development

## Firebase

- Create Firebase project
- Enable Authentication methods
- Enable Firestore
- Write security rules
- Add Firebase config to Expo app

## AI

- Create OpenAI API key
- Store it only on backend
- Implement one or more FastAPI endpoints that proxy user prompts safely to OpenAI

## Weather

- Sign up for provider
- Store API key on backend
- Implement fetch + caching + error handling


# Usage

## Frontend

```bash
npx expo start

## Backend

```bash
uvicorn main:app --reload
