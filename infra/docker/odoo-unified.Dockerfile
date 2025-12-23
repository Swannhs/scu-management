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

# Copy all service modules to Odoo addons
# Core
COPY services/core-service /usr/lib/python3/dist-packages/odoo/addons/openeducat_core

# Academic
COPY services/activity-service /usr/lib/python3/dist-packages/odoo/addons/openeducat_activity
COPY services/assignment-service /usr/lib/python3/dist-packages/odoo/addons/openeducat_assignment
COPY services/attendance-service /usr/lib/python3/dist-packages/odoo/addons/openeducat_attendance
COPY services/classroom-service /usr/lib/python3/dist-packages/odoo/addons/openeducat_classroom
COPY services/exam-service /usr/lib/python3/dist-packages/odoo/addons/openeducat_exam
COPY services/timetable-service /usr/lib/python3/dist-packages/odoo/addons/openeducat_timetable

# Administrative
COPY services/admission-service /usr/lib/python3/dist-packages/odoo/addons/openeducat_admission
COPY services/fees-service /usr/lib/python3/dist-packages/odoo/addons/openeducat_fees

# Campus
COPY services/facility-service /usr/lib/python3/dist-packages/odoo/addons/openeducat_facility
COPY services/library-service/openeducat_library /usr/lib/python3/dist-packages/odoo/addons/openeducat_library

# Portal
COPY services/parent-service /usr/lib/python3/dist-packages/odoo/addons/openeducat_parent

# ERP & Theme
COPY services/erp-service /usr/lib/python3/dist-packages/odoo/addons/openeducat_erp
COPY services/theme-service /usr/lib/python3/dist-packages/odoo/addons/theme_web_openeducat

USER odoo
