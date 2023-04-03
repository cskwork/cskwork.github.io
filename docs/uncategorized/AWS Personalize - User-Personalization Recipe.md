---
title: "AWS Personalize - User-Personalization Recipe"
description: "이 글은 Amazon Personalize를 사용하여 사용자 맞춤형 추천 시스템을 구축하는 방법에 대한 레시피를 설명합니다. Personalize는 사용자 상호작용 데이터, 탐색 데이터, 활용 데이터를 사용하여 사용자의 관심사와 관련성에 기반한 추천을 제공합니다. Pe"
date: 2023-03-01T23:11:21.861Z
tags: []
---
## Notion AI 요약
이 글은 Amazon Personalize를 사용하여 사용자 맞춤형 추천 시스템을 구축하는 방법에 대한 레시피를 설명합니다. Personalize는 사용자 상호작용 데이터, 탐색 데이터, 활용 데이터를 사용하여 사용자의 관심사와 관련성에 기반한 추천을 제공합니다. 

Personalize는 모든 아이템을 서로 상대적으로 0에서 1 사이의 점수로 매기고, 점수의 총합이 1이 되도록 합니다. 

Personalize는 아이템의 인기도에 기반한 추천도 제공합니다. Personalize API를 사용하여 사용자 ID와 입력 아이템 리스트를 제공하면, Personalize는 사용자에게 맞춤형으로 순위가 매겨진 아이템 리스트를 반환합니다.

## Impression data

- 사용자 상호작용 데이터 (클릭, 뷰, 구매)
- Implicit
    - personalize에 추천 데이터를 기반으로 사용자에게 제공하는 데이터
    - your user interacts with (for example, clicks) a video, record the choice in a call to the [PutEvents](https://docs.aws.amazon.com/personalize/latest/dg/API_UBS_PutEvents.html)
     API and include the `recommendationId`
     as a parameter.
- Explicit
    - 관리자가 personalize에 넣은 데이터
    - when your user interacts with (for example, clicks) a pair of shoes, you record the choice in a call to the [PutEvents](https://docs.aws.amazon.com/personalize/latest/dg/API_UBS_PutEvents.html)
     API and list the recommended items that are in stock in the `impression`
     parameter

### Exploration data

- 상호작용이 적은 제품, 관심도가 적은 제품

### Exploitation data

- 사용자 관심사, 관련도 기반

**주요 유즈 케이스**

[https://github.com/aws-samples/amazon-personalize-samples/blob/master/next_steps/core_use_cases/personalized_ranking/personalize_ranking_example.ipynb](https://github.com/aws-samples/amazon-personalize-samples/blob/master/next_steps/core_use_cases/personalized_ranking/personalize_ranking_example.ipynb)

### Personalized Ranking

![](/images/553e887f-c4eb-4f26-bfa7-c8d53c92fcf0-image.png)

~User-Personlization except →  sum = input items

### User-Personalization recommendation scoring

u, i = user-item pair

item catalog score = 0~1

![](/images/a88d46bd-5d4b-4165-be8b-3f5c73903d9d-image.png)

u, j = user item

Amazon Personalize scores **all of the items in your catalog relative to each other** on a scale from 0 to 1 (both inclusive), so that the total of all scores equals 1. For example, if you're getting movie recommendations for a user and there are three movies in the Items dataset, their scores might be `0.6`, `0.3`, and `0.1`. Similarly, if you have 1,000 movies in your inventory, the highest-scoring movies might have very small scores (the average score would be`.001`), but, because scoring is relative, the recommendations are still valid.

In mathematical terms, **scores for each user-item pair (u,i)** are computed according to the following formula, where `exp` is the exponential function, **w̅u and wi/j are user and item embeddings** respectively, and the Greek letter **sigma (Σ) represents summation over all items in the item dataset:**

## **Popularity-Count recipe**

- 컬리에서 이미 도입해서 사용하는 것으로 보임.

[https://docs.aws.amazon.com/personalize/latest/dg/native-recipe-new-item-USER_PERSONALIZATION.html#working-with-impressions](https://docs.aws.amazon.com/personalize/latest/dg/native-recipe-new-item-USER_PERSONALIZATION.html#working-with-impressions)

[https://docs.aws.amazon.com/personalize/latest/dg/interactions-datasets.html#interactions-impressions-data](https://docs.aws.amazon.com/personalize/latest/dg/interactions-datasets.html#interactions-impressions-data)

[https://docs.aws.amazon.com/personalize/latest/dg/rankings.html](https://docs.aws.amazon.com/personalize/latest/dg/rankings.html)

Cheatsheet

[https://github.com/aws-samples/amazon-personalize-samples/blob/master/PersonalizeCheatSheet2.0.md](https://github.com/aws-samples/amazon-personalize-samples/blob/master/PersonalizeCheatSheet2.0.md)

### INPUT

![](/images/c2cb9738-b202-409e-ab36-787fa1c7d168-image.png)


```python
# Get recommended reranking
# USERID, ITEM_LIST
get_recommendations_response_rerank = personalize_runtime.get_personalized_ranking(
        campaignArn = rerank_campaign_arn,
        userId = user_id,
        inputList = rerank_item_list
)

get_recommendations_response_rerank
```

### OUTPUT

```json
{'ResponseMetadata': {'RequestId': 'fd2ea40f-11f5-461c-b678-6a6a08bdb416',
  'HTTPStatusCode': 200,
  'HTTPHeaders': {'content-type': 'application/json',
   'date': 'Tue, 26 May 2020 22:02:55 GMT',
   'x-amzn-requestid': 'fd2ea40f-11f5-461c-b678-6a6a08bdb416',
   'content-length': '1442',
   'connection': 'keep-alive'},
  'RetryAttempts': 0},
 'personalizedRanking': [{'itemId': '1047', 'score': 0.1730128},
  {'itemId': '1046', 'score': 0.1639514},
  {'itemId': '1254', 'score': 0.1101557},
  {'itemId': '18692', 'score': 0.0762716},
  {'itemId': '5783', 'score': 0.0678702},
  {'itemId': '13434', 'score': 0.067667},
  {'itemId': '8915', 'score': 0.0616803},
  {'itemId': '1305', 'score': 0.0322442},
  {'itemId': '8543', 'score': 0.0297265},
  {'itemId': '11979', 'score': 0.0286533},
  {'itemId': '6820', 'score': 0.025196},
  {'itemId': '4154', 'score': 0.0246835},
  {'itemId': '2312', 'score': 0.0228279},
  {'itemId': '2158', 'score': 0.0179717},
  {'itemId': '2036', 'score': 0.0176177},
  {'itemId': '17786', 'score': 0.0166342},
  {'itemId': '12605', 'score': 0.0164588},
  {'itemId': '5671', 'score': 0.0163159},
  {'itemId': '8834', 'score': 0.0161517},
  {'itemId': '12025', 'score': 0.0149095},
  {'itemId': '3387'},
  {'itemId': '14552'},
  {'itemId': '6359'},
  {'itemId': '6609'},
  {'itemId': '9998'}],
 'recommendationId': 'RID-279bc670-9f3a-4633-b670-1183fd50c323'}
```

```python
ranked_list = []
item_list = get_recommendations_response_rerank['personalizedRanking']
for item in item_list:
    artist = get_artist_by_id(item['itemId'])
    ranked_list.append(artist)
ranked_df = pd.DataFrame(ranked_list, columns = ['Re-Ranked'])
rerank_df = pd.concat([rerank_df, ranked_df], axis=1)
rerank_df
```
