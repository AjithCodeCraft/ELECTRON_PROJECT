from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
from bson import ObjectId

# Custom ObjectId for Pydantic Validation
class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")

# User Model
class User(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    user_id: str = Field(...)
    email: str = Field(...)
    display_name: str = Field(...)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    last_login: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

# Book Model
class Book(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    user_id: str = Field(...)  # Foreign key to User
    title: str = Field(...)
    author: str = Field(...)
    file_path: str = Field(...)
    total_pages: int = Field(...)
    uploaded_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

# AudioFile Model
class AudioFile(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    book_id: str = Field(...)  # Foreign key to Book
    file_path: str = Field(...)
    duration_seconds: int = Field(...)
    uploaded_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

# PageSummary Model
class PageSummary(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    book_id: str = Field(...)  # Foreign key to Book
    page_number: int = Field(...)
    summary: str = Field(...)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

# ReadingProgress Model
class ReadingProgress(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    user_id: str = Field(...)  # Foreign key to User
    book_id: str = Field(...)  # Foreign key to Book
    current_page: int = Field(...)
    last_read: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

# UserPreferences Model
class UserPreferences(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    user_id: str = Field(...)  # Foreign key to User
    theme: Optional[str] = Field(default="light")
    font_size: Optional[int] = Field(default=12)
    language: Optional[str] = Field(default="en")

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
