# encoding: utf-8
require "socket"

class Client
  HOST = "127.0.0.1".freeze
  PORT = 12345.freeze

  attr_reader :socket, :channel_name
  def initialize(channel_name)
    @channel_name = channel_name

    @socket = UDPSocket.new
    @socket.bind(HOST, 0)
  end

  def subscribe!
    socket_send(subscription_message)
  end

  def receive_message
    message, * = socket.recvfrom(1024)
    message
  end

  def publish(content)
    message = <<-MSG
PUB #{channel_name}
#{content}
ENDPUB
    MSG

    socket_send(message)
  end

  def request_list
    socket_send("LIST")
  end

private

  def subscription_message
    "SUB #{channel_name}"
  end

  def socket_send(message)
    socket.send(message, 0, HOST, PORT)
  end
end
