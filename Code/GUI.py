import sys
from PyQt5.QtWidgets import QApplication, QMainWindow, QLabel, QPushButton

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Movie Recommender Game")
        
        self.label = QLabel("Welcome to the Movie Recommender Game!", self)
        self.label.setGeometry(50, 50, 300, 30)

        self.button = QPushButton("Start Game", self)
        self.button.setGeometry(150, 150, 100, 30)
        self.button.clicked.connect(self.start_game)

    def start_game(self):
        # Add your logic here to start the game
        pass

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = MainWindow()
    window.showMaximized()  # This will make the window full screen
    sys.exit(app.exec_())