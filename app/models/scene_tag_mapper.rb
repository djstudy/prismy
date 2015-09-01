class SceneTagMapper < ActiveRecord::Base
  belongs_to :scene
  belongs_to :tag
end
