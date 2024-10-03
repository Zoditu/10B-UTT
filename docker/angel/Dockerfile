FROM alpine AS fristLinux
RUN apk add --no-cache git
RUN mkdir /GPDS-practice-1
RUN git clone https://github.com/AngelV130/GPDS-practice-1.git .

FROM ubuntu:latest as myUbuntu
COPY --from=fristLinux /GPDS-practice-1 /GPDS-practice-1-copy
CMD /bin/bash