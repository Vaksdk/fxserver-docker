FROM scratch

COPY alpine /
COPY docker-entrypoint.sh /


ENTRYPOINT [ "/docker-entrypoint.sh" ]

# CMD [ "executable" ]