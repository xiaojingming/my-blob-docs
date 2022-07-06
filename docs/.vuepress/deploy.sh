#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 添加到docs仓库
# git add .
# git commit -m 'blob-docs change'
# git pull origin master
# git push -u origin master

# 生成静态文件
npm run docs:build

# # 进入生成的文件夹 
cd docs/.vuepress/dist
git init
git remote add build git@github.com:xiaojingming/my-blob.git
git add -A
git commit -m 'deploy'
git pull build master --allow-unrelated-histories
# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f build master

cd -