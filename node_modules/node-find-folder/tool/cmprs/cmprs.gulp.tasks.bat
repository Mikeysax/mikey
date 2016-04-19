@echo off

cd ../../gulp

for %%i in (*.js) do uglifyjs %%i -c -o %%i
