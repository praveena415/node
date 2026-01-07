
class Book {
    String title;
    String author;
    List<String> reviews;

    public Book(String title, String author, List<String> reviews) {
        this.title = title;
        this.author = author;
        this.reviews = reviews;
    }

    public Book clone() {
        return new Book(this.title, this.author, this.reviews);
    }
}
