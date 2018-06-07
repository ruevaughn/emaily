function localtunnel {
  lt -s email-1023-cjaewfe --port 5000
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done
