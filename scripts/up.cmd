@echo off

yarn

pulumi stack select %1 
pulumi up