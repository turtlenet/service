#!/bin/sh
ffmpeg -i - -ar 22050 -f flv -s 320x240 -ab 32 -filter:v fps=fps=15 -ss 00:00:00 -to 00:05:00 video.flv
