module ApplicationHelper
  def flash_class(level)
    case level.intern
      when :notice then "info"
      when :success then "success"
      when :error then "danger"
      when :alert then "warning"
    end
  end

  def flash_icon(level)
    case level.intern
      when :success then "fa fa-thumbs-up"
      when :notice then "fa fa-info-circle"
      when :error then "fa fa-minus-circle"
      when :alert then "fa fa-exclamation-triangle"
    end

  end

  def generate_og_tags

    meta_image = "<meta property=\"og:image\" content=\"#{request.protocol}#{request.host_with_port}#{asset_path("prismy_meta_image.png")}\" />"
    meta_title = "<meta property=\"og:title\" content=\"프리즈미(Prismy)\" />"
    meta_description = "<meta property=\"og:description\" content=\"여러가지 색깔을 가진 그들의 이야기를 들어보세요.\" />"

    meta_type = "<meta property=\"og:type\" content=\"website\" />"
    meta_site_name = "<meta property=\"og:site_name\" content=\"프리즈미(Prismy)\" />"
    meta_url = "<meta property=\"og:url\" content=\"#{request.original_url}\" />"

    meta_app_id = "<meta property=\"fb:app_id\" content=\"\" />"
    meta_title + meta_site_name + meta_url + meta_image + meta_description + meta_app_id + meta_type
  end
  
end
