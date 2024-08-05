# Use the official PostgreSQL Docker image as the base image
FROM postgres
FROM library/postgres

# Set environment variables
ENV POSTGRES_DB=ankialgodev
ENV POSTGRES_USER=root
ENV POSTGRES_PASSWORD=password

# Copy the SQL script to the Docker image
COPY init.sql /docker-entrypoint-initdb.d/
