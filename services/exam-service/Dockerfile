FROM odoo:16.0

USER root

# Install common OpenEducat dependencies
RUN apt-get update && apt-get install -y \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*
RUN pip3 install --no-cache-dir \
    num2words \
    xlwt \
    phonenumbers \
    polib

# Copy service code into Odoo addons directory
COPY . /usr/lib/python3/dist-packages/odoo/addons/openeducat_exam

USER odoo
