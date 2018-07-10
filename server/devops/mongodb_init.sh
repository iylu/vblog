# !/bin/sh

mongo vblog --eval "db.admins.remove({})"
mongo vblog --eval "db.admins.save({username: 'admin', password: 'admin123'})"