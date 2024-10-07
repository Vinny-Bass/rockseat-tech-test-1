# About the challenge

In this challenge, you will develop an API to perform CRUD of your *tasks*.

The API must contain the following functionalities:

- Creating a task
- Listing all tasks
- Updating a task by `id`
- Removing a task by `id`
- Marking a task as complete by `id`
- And the real challenge: Bulk import of tasks from a CSV file

## Routes and business rules

Before the routes, let's understand what structure (properties) a task should have:

- `id` - Unique identifier for each task
- `title` - Task title
- `description` - Detailed description of the task
- `completed_at` - Date when the task was completed. The initial value must be `null`
- `created_at` - Date when the task was created.
- `updated_at` - Should always be changed to the date when the task was updated.

Routes:

- `POST - /tasks`

It should be possible to create a task in the database, sending the `title` and `description` fields through the `body` of the request.

When creating a task, the fields: `id`, `created_at`, `updated_at` and `completed_at` should be filled in automatically, as per the instructions in the properties above.

- `GET - /tasks`

It should be possible to list all tasks saved in the database.

It should also be possible to perform a search, filtering tasks by `title` and `description`

- `PUT - /tasks/:id`

It should be possible to update a task by `id`.

In the `body` of the request, only the `title` and/or `description` should be received to be updated.

If only the `title` is sent, it means that the `description` cannot be updated and vice-versa.

Before performing the update, a validation must be performed to see if the `id` belongs to a task saved in the database.

- `DELETE - /tasks/:id`

It must be possible to remove a task by `id`.

Before performing the removal, a validation must be performed to see if the `id` belongs to a task saved in the database.

- `PATCH - /tasks/:id/complete`

It must be possible to mark the task as complete or not. This means that if the task is completed, it should return to its “normal” state.

Before the change, a validation must be performed to see if the `id` belongs to a task saved in the database.