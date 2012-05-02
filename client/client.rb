# encoding: utf-8
require "socket"

socket = UDPSocket.new
socket.bind("127.0.0.1", 0)

channel_name = ARGV.shift

subscription_message = "SUB #{channel_name}"
socket.send(subscription_message, 0, "127.0.0.1", 12345)

Thread.new do
  loop do
    message, * = socket.recvfrom(1024)
    puts "\n#{message}"
    print "#{channel_name} >"
  end
end

loop do
  print "#{channel_name} >"
  content = gets.chomp

  if content == "LIST"
    message = "LIST"
  else
    message = <<-MSG
PUB #{channel_name}
#{content}
ENDPUB
  MSG
  end

  socket.send(message, 0, "127.0.0.1", 12345)
end
