# read the workflow template
WORKFLOW_TEMPLATE=$(cat .github/workflows/workflow-template.yaml)

# iterate each app in application's directory
for APP in $(ls -d *); do
    echo "generating workflow for ${APP}"

    # replace template app placeholder with app name
    WORKFLOW=$(echo "${WORKFLOW_TEMPLATE}" | sed "s/{{APP}}/${APP}/g")

    # save workflow to .github/workflows/{APP}
    echo "${WORKFLOW}" > .github/workflows/${APP}.yaml
done