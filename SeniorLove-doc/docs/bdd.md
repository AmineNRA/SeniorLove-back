# Conceptualisation base de donnée

Liste entité

| user       | profil       | event           | conversation | message     | match     |
|:----------:|:------------:|:--------------:|:------------:|:-----------:|-----------:|
| mail       | pseudo       | title          | created_at   | content     | status     |
| password   | age          | tags           |              | created_at  | created_at |
| created_at | gender       | description    |              | change_at   | deleted_at |
| disabled_at| looking_for  | date           |              | deleted_at  |            |
| deleted_at | city         | time           |              |             |            |
| verified_at| description  | street         |              |             |            |
|            | interests    | city           |              |             |            |
|            | profile_image| postal_code    |              |             |            |
|            | last_online  |thumbnail_image |              |             |            |
|            |              | full_image     |              |             |            |
|            |              |max_participants|              |             |            |
|            |              | status         |              |             |            |

MCD

Le MCD a été créer sur mocodo online :

```bash
PROFIL:id, pseudo, age, gender, looking_for, city, description, interests, profile_image, last_online
RESERVER, 1N USER, 1N EVENT
APPARTIENT, 11 USER, 11 PROFIL
APPARTIENT3, 01 USER, 11 CONVERSATION : user_id_2
EVENT: id, title, tag, description, date, time, street, city, postal_code, thumbnail_image, full_image, max_participant, status
CREER2, 11 USER, 11 EVENT
USER: id, mail, password, created_at, disabled_at, deleted_at, verified_at
APPARTIENT2, 01 USER, 11 CONVERSATION : user_id_1
CONVERSATION: id, created_at, user_id_1, user_id_2
APPARTIENT4, 0N USER, 11 MATCH : user_id_2
CREER1, 0N USER, 11 MATCH : user_id_1
CREER, 11 USER, 11 MESSAGE
MESSAGE: id, content, created_at, change_at, deleted_at
APPARTIENT1, 11 MESSAGE, 1N CONVERSATION
MATCH: id, user_id_1, user_id_2, status, created_at
```

[link](../public/MCD.svg)

MLD

| user       | profil       | event          | conversation | message        | match      |reservation  |
|:----------:|:------------:|:--------------:|:------------:|:--------------:|:----------:|:-----------:|
|  id        |  id          |  id            |  id          |  id            | id         | id          |
| mail       | pseudo       | title          | created_at   | content        | status     | #user_id    |
| password   | age          | tags           | #user_id_1   | created_at     | created_at | #event_id   |
| created_at | gender       | description    | #user_id_2   | updated_at     | deleted_at |             |
| disabled_at| looking_for  | date           |              | status         | #user_id_1 |             |
| deleted_at | city         | time           |              |#conversation_id| #user_id_2 |             |
| verified_at| description  | street         |              | #user_id       |            |             |
|            | interests    | city           |              |                |            |             |
|            | profile_image| postal_code    |              |                |            |             |
|            | last_online  |thumbnail_image |              |                |            |             |
|            | #user_id     | full_image     |              |                |            |             |
|            |              |max_participants|              |                |            |             |
|            |              | status         |              |                |            |             |
|            |              | #user_id       |              |                |            |             |

Enumération des status des tables :

- Enumération de match : pending, accepted, rejected
- Enumération de event : scheduled, finished
- Enumération de message : unread, read, deleted

La table reservation est la table de liaison entre user et event.

L'id ( clé primaire ) pour plusieurs tables seront concaténés avec deux ids dans leur table pour garder une unicité des données :

1. Conversation qui sera la concaténation de #user_id_1 et #user_id_2
2. Match qui sera la concaténation de #user_id_1 et #user_id_2
3. Reservation qui sera la concatenation de #user_id et #event_id
