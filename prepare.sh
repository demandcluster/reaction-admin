#!/bin/sh

rm ./imports/plugins/custom/reaction-demandcluster -R
git clone https://demandcluster:$GH_TOKEN@github.com/demandcluster/reaction-demandcluster.git ./imports/plugins/custom/reaction-demandcluster
././imports/plugins/custom/reaction-demandcluster/npm install


