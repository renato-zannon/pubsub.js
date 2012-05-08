require 'readline'
require_relative "client"

channel_name = ARGV.shift
unless channel_name
  abort "Uso: #{$PROGRAM_NAME} nome_do_canal"
end

prompt = "#{channel_name} >"

client = Client.new(channel_name)
client.subscribe!

Thread.new do
  loop do
    message = client.receive_message
    puts "\n#{message}"
    Readline.refresh_line
  end
end

stty_save = `stty -g`.chomp
trap('INT') { puts; system('stty', stty_save); exit }

while content = Readline.readline(prompt, true)
  next if content.empty?

  if content == "LIST"
    client.request_list
  else
    client.publish(content)
  end
end
