from fastapi import APIRouter

from models.model import User, Book, AudioFile, PageSummary, ReadingProgress
from schema.schemas import user_serializer, book_serializer, audio_file_serializer, page_summary_serializer, reading_progress_serializer
from config.database import collection_name
from bson import ObjectId

router = APIRouter()

@router.get("/users")
async def get_users():
    users = collection_name.find({})
    return [user_serializer(user) for user in users]