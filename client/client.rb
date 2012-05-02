# encoding: utf-8
require "socket"

socket = UDPSocket.new
socket.bind("127.0.0.1", 0)

subscription_message = "SUB test_channel"
socket.send(subscription_message, 0, "127.0.0.1", 12345)

Thread.new do
  loop do
    message, * = socket.recvfrom(1024)
    puts message
  end
end

loop do
  content = gets.chomp

  if content == "LIST"
    message = "LIST"
  else
    message = <<-MSG
PUB test_channel
#{content}
ENDPUB
  MSG
  end

  socket.send(message, 0, "127.0.0.1", 12345)
end
