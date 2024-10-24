FROM debian:12

ARG USER=morty

# Update apt registry and install basic packages
RUN apt-get update && apt-get install -y \
    # basic stuff
    curl git vim \
    nodejs npm

# Set the working directory
WORKDIR /workspace

# Setup non-root user
RUN useradd -m $USER
RUN chown -R $USER /workspace
USER $USER

# Shell setup
RUN echo "set -o vi" >> ~/.bashrc
RUN echo "alias ll='ls -la'" >> ~/.bashrc

CMD ["/bin/bash", "-i"]
