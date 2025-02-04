# Conceptualisation base de donnée

## Liste entité

| user       | profile      | event           | conversation | message    | match      |interest |
|:----------:|:------------:|:--------------:|:------------:|:-----------:|:-----------:|:-------:|
| mail       | pseudo       | title          | created_at   | content     | status     |name     |
| password   | age          | tags           |              | created_at  | created_at |         |
| created_at | gender       | description    |              | change_at   | deleted_at |         |
| disabled_at| looking_for  | date           |              | deleted_at  |            |         |
| deleted_at | city         | time           |              |             |            |         |
| verified_at| description  | street         |              |             |            |         |
|            | profile_image| city           |              |             |            |         |
|            | last_online  | postal_code    |              |             |            |         |
|            |              |thumbnail_image |              |             |            |         |
|            |              | full_image     |              |             |            |         |
|            |              |max_participants|              |             |            |         |
|            |              | status         |              |             |            |         |

## MCD

**Le MCD a été créer sur mocodo online :**

```bash
USER: id, mail, password, created_at, disabled_at, deleted_at, verified_at
CREER1, 0N PROFILE, 11 MATCH : profile_id_1
MESSAGE: id, content, created_at, change_at, deleted_at
CREER, 11 PROFILE, 11 MESSAGE
APPARTIENT, 11 USER, 11 PROFILE
APPARTIENT4, 0N PROFILE, 11 MATCH : profile_id_2
MATCH: id, profile_id_1, profile_id_2, status, created_at
APPARTIENT1, 11 MESSAGE, 1N CONVERSATION
CONVERSATION: id, created_at, profile_id_1, profile_id_2
APPARTIENT3, 0N PROFILE, 11 CONVERSATION : profile_id_2
PROFILE:id, pseudo, age, gender, looking_for, city, description, interests, profile_image, last_online
RESERVER, 0N PROFILE, 1N EVENT
APPARTIENT2, 0N PROFILE, 11 CONVERSATION : profile_id_1
AVOIR, 0N PROFILE, 0N INTEREST
CREER2, 0N PROFILE, 11 EVENT
EVENT: id, title, tag, description, date, time, street, city, postal_code, thumbnail_image, full_image, max_participant, status
INTEREST: id, name
```

**Lien du schéma du mcd : [link](public/MCD.svg)**

## MLD

| user       | profile      | event          | conversation | message        | match       |reservation  | interest |profile_interest|
|:----------:|:------------:|:--------------:|:------------:|:--------------:|:-----------:|:-----------:|:--------:|:--------------:|
|  id        |  id          |  id            |  id          |  id            | id          | id          |id        |id              |
| mail       | pseudo       | title          | created_at   | content        | status      | #profile_id |name      |  #profile_id   |
| password   | age          | tags           | #profile_id_1| created_at     | created_at  | #event_id   |          | #interest_id   |
| created_at | gender       | description    | #profile_id_2| updated_at     | deleted_at  |             |          |                |
| disabled_at| looking_for  | date           |              | status         |#profile_id_1|             |          |                |
| deleted_at | city         | time           |              |#conversation_id|#profile_id_2|             |          |                |
| verified_at| description  | street         |              | #profile_id    |             |             |          |                |
| #profile_id| profile_image| city           |              |                |             |             |          |                |
|            | last_online  | postal_code    |              |                |             |             |          |                |
|            |              |thumbnail_image |              |                |             |             |          |                |
|            |              | full_image     |              |                |             |             |          |                |
|            |              |max_participants|              |                |             |             |          |                |
|            |              | status         |              |                |             |             |          |                |
|            |              | #profile_id    |              |                |             |             |          |                |

**Enumération des status des tables :**

- Enumération de match : pending, accepted, rejected
- Enumération de event : scheduled, finished
- Enumération de message : unread, read, deleted

La table reservation est la table de liaison entre user et event.
La table profile_interest et la table de liaison entre profile et interest.

L'id ( clé primaire ) pour plusieurs tables seront concaténés avec deux ids dans leur table pour garder une unicité des données :

1. Conversation qui sera la concaténation de #profile_id_1 et #profile_id_2
2. Match qui sera la concaténation de #profile_id_1 et #profile_id_2
3. Reservation qui sera la concatenation de #profile_id et #event_id
4. profile_interest qui sera la concaténation de #profile_id et #interest_id

## Endpoint API

**User:**

|Requête|Méthode|Explication|
|:-----:|:-----:|:---------:|
|back.seniorlove/user/find|GET|Rechercher si l'utilisateur est connu au pas (grace à son mail)|
|back.seniorlove/user|POST|Authentification de l'utilisateur|
|back.seniorlove/user/:id|PATCH|Modifier un user|
|back.seniorlove/user/:id|DELETE|Supprime un user|

**Profile:**

|Requête|Méthode|Explication|
|:-----:|:-----:|:---------:|
|back.seniorlove/profile/:id|GET|Envoi un profil|
|back.seniorlove/profile?preference=preference|GET|Filtre profil|
|back.seniorlove/profile/:id|PATCH|Modifie un profil|
|back.seniorlove/profile|DELETE|Supprime un user|

**Conversation:**

|Requête|Méthode|Explication|
|:-----:|:-----:|:---------:|
|back.seniorlove/conversation/:profile_id|GET|Cherche la liste de conversations du user|
|back.senior/love/conversation/:id|DELETE|Supprime une conversation|

**Message:**

|Requête|Méthode|Explication|
|:-----:|:-----:|:---------:|
|back.seniorlove/message/:conversation_id|GET|Cherche tous les messages d'une conversation|
|back.seniorlove/message|POST|Créer un message|
|back.seniorlove/message/:id|PATCH|Modifie un message|
|back.seniorlove/message/:id|DELETE|Supprime un message|

**Event:**

|Requête|Méthode|Explication|
|:-----:|:-----:|:---------:|
|back.seniorlove/event|GET|Envoi la liste de tous les evenements|
|back.seniorlove/event/:id|GET|Envoi un evenement|
|back.seniorlove/event|POST|Créer un évènement|
|back.seniorlove/event|PATCH|Modifie un evenement|
|back.seniorlove/event/:id|DELETE|Supprime un evenement|

**Reservation:**

|Requête|Méthode|Explication|
|:-----:|:-----:|:---------:|
|back.seniorlove/reservation|POST|Créer une réservation|
|back.seniorlove/reservation/:id|DELETE|Supprime une réservation|

**Match:**

|Requête|Méthode|Explication|
|:-----:|:-----:|:---------:|
|back.seniorlove/match/:id|GET|Trouve les match|
|back.seniorlove/match/:id|GET|Créer un match|
|back.seniorlove/match/:id|DELETE|Supprime un match|
