AutoHtml.add_filter(:sized_image) do |text, options|

  text.gsub(/http(s|):\/\/.+\.(jpg|jpeg|bmp|gif|png|JPG|JPEG|BMP|GIF|PNG)(\?\S+)?/i) do |match|
    # width = options[:width]
    %|<img src="#{match}" alt="" class="img-responsive aligncenter " />|
  end
end