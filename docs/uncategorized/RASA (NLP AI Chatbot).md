---
title: "RASA (NLP AI Chatbot)"
description: "Rasa is an open source machine learning framework for automated text and voice-based conversations. Understand messages, hold conversations, and conne"
date: 2021-04-18T12:45:53.648Z
tags: []
---
Rasa is an open source machine learning framework for automated text and voice-based conversations. Understand messages, hold conversations, and connect to messaging channels and APIs.

RASA : 머신러닝 기반 챗봇.  rasa.com/docs/rasa/

 

사용툴 : Pycharm

### 사용 방법:

1 goto Pycharm Terminal 

2 Pip(Package Installer for Python)  로 rasa 설치 

pip install rasa
   exception-  pip install --U pip 

                  pip install --U rasa

3 rasa 초기화 (hello world 로드)

rasa init
4 학습모델로 훈련.

rasa train
5 shell로 대화하기

rasa shell
기본 모듈이 로딩됐으면 glossary를 만들어서 각 모듈 분석/이해.

### 구조 :

#domain.yml
```
intents:
  - affirm
  - deny
  - greet
  
entities:
  - name
  
slots:
  concerts:
    type: list
    influence_conversation: false
    
responses:
  utter_greet:
    - text: "Hey there!"
  utter_goodbye:
    - text: "Goodbye :("
    
 actions:
  - action_search_concerts
  - action_search_venues
 ```
 
### 정의 : 
 
#### session_config:
 session_expiration_time: 60  # value in minutes
   carry_over_slots_to_new_session: true
domain- lists input, output of assistant

: intent- user query. (defined with examples)
: entity- extracts keywords from user message
: slot - bot memory. key-value store.
: responses - bot response to intent (utter_)
: actions - bot action(coded action action_)
: session_config - config. for the bot

#### config
: pipeline- lists nlu components that define Rasa's sytem.
: component- process user input into structured output. (THE language odel)
: such as MitieNLP, SpaceyNLP,

nlu - deals with understanding human lang. parsing

#### policies
components that predict dialogue system's next action.
makes decisions about how conversation flow should proceed

#### rules
special training data to specify rule.

#### fallback
handling of low confidence message - either to attempt
to disambiguate user input of provide default message.

#### story
Training data for the dialogue model. Consis conv. between user and bot.