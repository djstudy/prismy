# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151205023131) do

  create_table "choices", force: :cascade do |t|
    t.integer  "line_id"
    t.text     "content"
    t.text     "response"
    t.boolean  "correct"
    t.integer  "sequence"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "comments", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "interviewee_id"
    t.text     "content"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "interviewees", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.string   "description"
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
    t.string   "password",      default: "AZstory"
    t.string   "profile_image"
  end

  create_table "lines", force: :cascade do |t|
    t.integer  "interviewee_id"
    t.text     "content"
    t.string   "line_type"
    t.integer  "sequence"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.integer  "scene_id"
    t.string   "link_name"
    t.text     "link_content"
  end

  create_table "scene_tag_mappers", force: :cascade do |t|
    t.integer  "scene_id"
    t.integer  "tag_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "scenes", force: :cascade do |t|
    t.string   "description"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.integer  "interviewee_id"
  end

  create_table "subject_tag_mappers", force: :cascade do |t|
    t.integer  "subject_id"
    t.integer  "tag_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "subjects", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tags", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "cover_img",  default: "ellenpage.png"
  end

  create_table "user_answers", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "line_id"
    t.integer  "choice_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.integer  "interviewee_id"
    t.string   "written_answer"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
