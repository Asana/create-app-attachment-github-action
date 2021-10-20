# Connect pull request attachments from GitHub to Asana

Always be in the loop on the status of a pull request with this GitHub Action, which connects an attachment to Asana.

How does it work? The GitHub Action will check the description of the pull request for the specific Asana task URL and automatically create an attachment with the latest status from GitHub as the authenticated user. 

This is available to all Asana users on Premium, Business, and Enterprise plans. 

To get notified when the pull request status changes in Asana, check out [GitHub Action](https://github.com/Asana/comment-on-task-github-action).

To learn more about using the GitHub + Asana integration, visit the [Asana Guide](https://asana.com/guide/help/api/github).

<img src="assets/github-attachment.png" alt="GitHub pull request attachment">

## Usage

#### Step 1: Generate a secret token for your Action

* Go to https://github.integrations.asana.plus/auth?domainId=ghactions
* Authorize the Asana app and the GitHub app
* Copy the generated secret

#### Step 2: Set up a repository secret for the secret token

* Go to settings page for your repository
* Click on *Secrets* on left sidebar
* Click **New repository secret**
* Create a new secret called `ASANA_SECRET` with value set to the secret token
* Click **Add secret**

#### Step 3: Create a workflow file

Pick a name and create a `.yml` workflow file with that name in the `.github/workflows/` directory (e.g, `.github/workflows/create-asana-comment.yml`). 

This GitHub action runs in the context of a pull request. This means we support only [`pull_request`](https://docs.github.com/en/actions/learn-github-actions/events-that-trigger-workflows#pull_request) event. We provide an example `.github/workflows/create-asana-comment.yml` file below.

```yaml
on:
  pull_request:
    types: [opened, reopened]

jobs:
  create-asana-attachment-job:
    runs-on: ubuntu-latest
    name: Create pull request attachments on Asana tasks
    steps:
      - name: Create pull request attachments
        uses: Asana/create-app-attachment-github-action@v1.0
        id: postAttachment
        with:
          asana-secret: ${{ secrets.ASANA_SECRET }}
      - name: Log output status
        run: echo "Status is ${{ steps.postAttachment.outputs.status }}"
```

This workflow set up in the file above will run whenever a pull request is opened or reopened.

#### Step 4: Enable the GitHub integration in your Asana project

<img src="assets/customize-button.png" alt="The 'customize' button in the project view">

1. Navigate to a project where you would like to activate the integration
2. Click on the Customize Menu drop-down in the right-hand corner
3. Select +Add app

<img src="assets/github-app-in-the-gallery.png" alt="The 'customize' button in the project view">

4. Select GitHub
5. You’ll be prompted to authorize your GitHub account. Please follow the instructions
6. The GitHub integration will be installed at a project level. In the following screen, you can select the projects you would like to add the integration to
7. Now, you can use the GitHub integration in any of the projects to which it has been added


#### Step 5: Adapt the GitHub Action to your workflow

##### Available parameters

*Required*:
* ```asana-secret``` - Should contain the Asana secret from Step 3

*Optional*:
* ```allowed-projects``` - List of Asana projects IDs where attachments can be added
* ```blocked-projects``` - List of Asana projects IDs where attachments cannot be added


If values are provided for neither the `allowed-projects` parameter or the `blocked-projects` parameter, the GitHub action will be able to add attachments to any task. Providing values for both ```allowed-projects``` and ```blocked-projects``` lists at the same time will result in an error.

In the workflow file below, we provide an allowlist to the GitHub Action. The Action will only create pull request attachments on tasks that are in project 1125036528002799 or 1192160553314033. 

```yaml
jobs:
  create-asana-attachment-job:
    runs-on: ubuntu-latest
    name: Create pull request attachments on Asana tasks
    steps:
      - name: Create pull request attachments
        uses: Asana/create-app-attachment-github-action@v1.0
        id: postAttachment
        with:
          asana-secret: ${{ secrets.ASANA_SECRET }}
          allowed-projects: |
            1125036528002799
            1192160553314033
      - name: Get status
        run: echo "Status is ${{ steps.postAttachment.outputs.status }}"
```

In the workflow file below, we provide a blocklist to the GitHub Action. The Action will only create pull request attachments on tasks that are **not** in project 1125036528002799 or 1192160553314033.

```yaml
jobs:
  create-asana-attachment-job:
    runs-on: ubuntu-latest
    name: Create pull request attachments on Asana tasks
    steps:
      - name: Create pull request attachments
        uses: Asana/create-app-attachment-github-action@v1.0
        id: postAttachment
        with:
          asana-secret: ${{ secrets.ASANA_SECRET }}
          blocked-projects: |
            1125036528002799
            1192160553314033
      - name: Get status
        run: echo "Status is ${{ steps.postAttachment.outputs.status }}"
```

## Contributing

### Unit tests

Unit tests should be run via npm command:

```npm run test```

### Formatting and Linting

```npm run lint```
