FROM odoo:16.0

USER root

# Install dependencies required by OpenEducat and common addons
RUN apt-get update && apt-get install -y \
    python3-pip \
    libsasl2-dev \
    python3-dev \
    libldap2-dev \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

# Install python packages
RUN pip3 install --no-cache-dir \
    num2words \
    xlwt \
    phonenumbers \
    polib

USER odoo
