def user_serializer(user):
    return {
        "id": str(user["_id"]),
        "user_id": user.get("user_id"),
        "email": user.get("email"),
        "display_name": user.get("display_name"),
        "created_at": user.get("created_at").isoformat() if user.get("created_at") else None,
        "last_login": user.get("last_login").isoformat() if user.get("last_login") else None
    }

# Serializer for Book
def book_serializer(book):
    return {
        "id": str(book["_id"]),
        "user_id": book.get("user_id"),
        "title": book.get("title"),
        "author": book.get("author"),
        "file_path": book.get("file_path"),
        "total_pages": book.get("total_pages"),
        "uploaded_at": book.get("uploaded_at").isoformat() if book.get("uploaded_at") else None
    }

# Serializer for AudioFile
def audio_file_serializer(audio_file):
    return {
        "id": str(audio_file["_id"]),
        "book_id": audio_file.get("book_id"),
        "file_path": audio_file.get("file_path"),
        "duration_seconds": audio_file.get("duration_seconds"),
        "uploaded_at": audio_file.get("uploaded_at").isoformat() if audio_file.get("uploaded_at") else None
    }

# Serializer for PageSummary
def page_summary_serializer(page_summary):
    return {
        "id": str(page_summary["_id"]),
        "book_id": page_summary.get("book_id"),
        "page_number": page_summary.get("page_number"),
        "summary": page_summary.get("summary"),
        "created_at": page_summary.get("created_at").isoformat() if page_summary.get("created_at") else None
    }

# Serializer for ReadingProgress
def reading_progress_serializer(reading_progress):
    return {
        "id": str(reading_progress["_id"]),
        "user_id": reading_progress.get("user_id"),
        "book_id": reading_progress.get("book_id"),
        "current_page": reading_progress.get("current_page"),
        "last_read": reading_progress.get("last_read").isoformat() if reading_progress.get("last_read") else None
    }

# Serializer for UserPreferences
def user_preferences_serializer(user_preferences):
    return {
        "id": str(user_preferences["_id"]),
        "user_id": user_preferences.get("user_id"),
        "theme": user_preferences.get("theme"),
        "font_size": user_preferences.get("font_size"),
        "language": user_preferences.get("language")
    }

# General List Serializer
def list_serializer(documents, serializer_function):
    return [serializer_function(doc) for doc in documents]