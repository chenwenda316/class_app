location / {
  try_files $uri $uri/ @router;
  index index.html;
}
 
location @router {
  rewrite ^.*$ /index.html last;
}