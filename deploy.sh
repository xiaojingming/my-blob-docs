#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 添加到docs仓库
git add .
git commit -m 'blob-docs change'
git push origin master git@github.com:xiaojingming/my-blob-docs.git

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f build git@github.com:xiaojingming/my-blob.git master:gh-pages

cd -