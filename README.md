# Connect pull request attachments from GitHub to Asana

Always be in the loop on the status of a pull request with this GitHub Action, which connects an attachment to Asana.

How does it work? The GitHub Action will check the description of the pull request for the specific Asana task URL and automatically create an attachment with the latest status from GitHub.

This is available to all Asana users on Premium, Business, and Enterprise plans. 

To learn more about using the GitHub + Asana integration, visit the [Asana Guide](https://asana.com/guide/help/api/github).

<img src="assets/github-attachment.png" alt="GitHub pull request attachment">

## Usage

#### Step 1: Generate a secret token for your Action

* go to https://github.integrations.asana.plus/auth?domainId=ghactions
* authorize the Asana app and the GitHub app
* copy the generated secret

#### Step 2: Set up a repository secret for the secret token

* go to settings page for your repository
* click on *Secrets* on left sidebar
* click **New repository secret**
* create a new secret called `ASANA_SECRET` with value set to the secret token
* click **Add secret**

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

Follow the steps in the [Asana Guide]((https://asana.com/guide/help/api/github)) to enable the GitHub integration in your Asana project. This will turn GitHub attachments into informative widgets that show information about the pull request on the Asana task.

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
