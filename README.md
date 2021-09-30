# Asana GitHub Action for Post an attachment

This action allows you to post your Pull Request as an attachment to the Asana task. 
Links to the Asana tasks must be added in the description of the Pull Request (before the Pull Request is created).

## Usage

### Step 1: Prepare values for setting up your variables for Actions

* Go to the https://github.integrations.asana.plus/auth?domainId=ghactions
* After authorization flow you'll see your Asana secret, please click on "Copy" button

### Step 2: Configure Secrets in your GitHub repository

On GitHub, go in your repository settings, click on *Secrets* and create a new secret called ```ASANA_SECRET``` and add paste Asana secret from the previous step


### Step 3: Add action to your .github/workflows/ directory

To use the action simply create an ```add-asana-attachment.yml``` (or choose custom *.yml name) in the .github/workflows/ directory.


### Step 4: Example Workflow Template

Please make sure you use ```pull_request``` as your action trigger, other triggers are not supported

```
on:
  pull_request:
    types: [opened, reopened]

jobs:
  create-asana-attachment-job:
    runs-on: ubuntu-latest
    name: Post an attachment
    steps:
      - name: Post an attachment
        uses: Asana/create-app-attachment-github-action@v1.0
        id: postAttachment
        with:
          asana-secret: ${{ secrets.ASANA_SECRET }}
      - name: Get status
        run: echo "Status is ${{ steps.postAttachment.outputs.status }}"
```
        
### Step 5: Configure the GitHub Action if need to adapt for your needs or workflows

#### Available parameters

*Required*:
* ```asana-secret``` - Should contain Asana secret from Step 3

*Optional*:
* ```allowed-projects``` - List of Asana projects gids where attachments can be added
* ```blocked-projects``` - List of Asana projects gids where attachments cannot be added

If both lists are empty, attachments can be added to any task that was parsed from the Pull Request description
Using both ```allowed-projects``` and ```blocked-projects``` lists at the same time will result in an error

#### Examples of use allowed and blocked lists

``` 
jobs:
  create-asana-attachment-job:
    runs-on: ubuntu-latest
    name: Post an attachment
    steps:
      - name: Post an attachment
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

```
jobs:
  create-asana-attachment-job:
    runs-on: ubuntu-latest
    name: Post an attachment
    steps:
      - name: Post an attachment
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
