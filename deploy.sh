#!/usr/bin/env sh

set -e

# staging or production?
BUCKET="dev"
while [ "$1" != "" ]; do
	case $1 in
		--staging )
			shift
			BUCKET="dev"
			;;

		--preprod )
			shift
			BUCKET="preprod"
			;;

		--production )
			shift
			BUCKET="master"
			;;

		* ) shift;;
	esac
done

echo "Deploying to $BUCKET ..."

CDN_AUTH=$(echo $CDN_AUTH | base64 --decode)
USAT_AUTH=$(echo $USAT_AUTH | base64 --decode)
USCP_AUTH=$(echo $USCP_AUTH | base64 --decode)


CDN_SPACE="gs://usat-storytelling/storytelling-studio-apps/$BUCKET"
PUBLIC_PATH="https://www.gannett-cdn.com/usat-storytelling/storytelling-studio-apps/$BUCKET"
CDN_PATH="https://$CDN_AUTH@www.gannett-cdn.com/usat-storytelling/storytelling-studio-apps/$BUCKET"
DEV_DOMAIN="dev-uw.usatoday.com"

PROJECT_SLUG="$(basename $(pwd))"
PROJECT_FOLDER="./public"

PUBLIC_URL="$PUBLIC_PATH/$PROJECT_SLUG/index.html"

# GIT_BRANCH=$BUCKET npm run build

gsutil -o "GSUtil:parallel_process_count=1" -m rsync -r $PROJECT_FOLDER "$CDN_SPACE/$PROJECT_SLUG"

for filename in $(cd $PROJECT_FOLDER && find *); do
	echo "DEPLOYING: $PUBLIC_PATH/$PROJECT_SLUG/$filename"
	curl -X PURGE "$CDN_PATH/$PROJECT_SLUG/$filename" &
done

curl -X PURGE "$CDN_PATH/$PROJECT_SLUG/index.html" -m 10 &
curl -X PURGE --user $USCP_AUTH "https://www.jsonline.com/storytelling/milwaukee-resources-guide-housing-mental-health-education-public-safety-voting-employment-recycling/"

# uncache the files embeds
# gsutil -o "GSUtil:parallel_process_count=1" -m setmeta  -h "Cache-Control: max-age=10" "$CDN_SPACE/$PROJECT_SLUG/uw/*" &

# Add AllUsers:R to the project folder
gsutil -m acl ch -u AllUsers:R  -r "$CDN_SPACE/$PROJECT_SLUG"


wait
echo "Deployed:"
echo $PUBLIC_URL
