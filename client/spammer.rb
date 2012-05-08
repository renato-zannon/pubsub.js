# encoding: utf-8
require "socket"
require_relative "client"

channel_name = ARGV.shift
spam_message = ARGV.shift

unless channel_name && spam_message
  abort "Uso: #{$PROGRAM_NAME} nome_do_canal mensagem"
end

client = Client.new(channel_name)

loop do
  sleep(0.05)
  client.publish(spam_message)
end
