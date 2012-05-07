# encoding: utf-8
require "socket"

socket = UDPSocket.new
socket.bind("127.0.0.1", 0)

channel_name = ARGV.shift
content = ARGV.shift

  message = <<-MSG
PUB #{channel_name}
#{content}
ENDPUB
  MSG

loop do
  sleep(0.05)
  socket.send(message, 0, "127.0.0.1", 12345)
end
