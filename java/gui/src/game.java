import javax.swing.*;
import javax.swing.border.*;
import javax.swing.event.*;
import java.awt.*;
import java.awt.event.*;

public class game extends JFrame{
    // moving flag
    boolean up = true;
    boolean down = true;
    boolean right = true;
    boolean left = true;
    int a = 50;
    int n = 5;
    JPanel panel = new JPanel();
    JPanel area = new JPanel();
    JPanel head = new JPanel();
    JPanel sub = new JPanel();
    JLabel label = new JLabel("游戏开始");
    Wall[] wall = new Wall[5 * n];
    JButton Up = new JButton("UP");
    JButton Down = new JButton("DOWN");
    JButton Right = new JButton("RIGHT");
    JButton Left = new JButton("LEFT");
    game(String name){
        super(name);
        setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        Container contentPane = getContentPane();
        setDefaultLookAndFeelDecorated(true);
        setLayout(new BorderLayout());
        setSize(600, 600);
        setVisible(true);
        panel.setLayout(null);
        for(int i = 0; i < n; i++){
            wall[4 * i] = new Wall();
            wall[4 * i].setBounds(new Rectangle(0, i * a, a, a));
            wall[4 * i + 1] = new Wall();
            wall[4 * i + 1].setBounds(new Rectangle(i * a, n * a, a, a));
            wall[4 * i + 2] = new Wall();
            wall[4 * i + 2].setBounds(new Rectangle(n * a, (n - i) * a, a, a));
            wall[4 * i + 3] = new Wall();
            wall[4 * i + 3].setBounds(new Rectangle((n - i) * a, 0, a, a));
            panel.add(wall[4 * i]);
            panel.add(wall[4 * i + 1]);
            panel.add(wall[4 * i + 2]);
            panel.add(wall[4 * i + 3]);
        }
        Star star = new Star();
        star.setBounds(new Rectangle(1 * a, 2 * a, a, a));
        panel.add(star);
        Box box = new Box();
        box.setBounds(new Rectangle(2 * a, 3 * a, a, a));
        panel.add(box);
        Actor actor = new Actor();
        actor.setBounds(new Rectangle(3 * a, 3 * a, a, a));
        panel.add(actor);
        actor.addAncestorListener(new AncestorListener() {
            @Override
            public void ancestorAdded(AncestorEvent event) {}
            @Override
            public void ancestorRemoved(AncestorEvent event) {}
            @Override
            public void ancestorMoved(AncestorEvent event) {
                for (int i = 0; i < n * 4; i++) {
                    if(right){
                        right = judgeMove(wall[i], actor, a, 0);
                    }
                    if(left){
                        left = judgeMove(wall[i], actor, -a, 0);
                    }
                    if(down){
                        down = judgeMove(wall[i], actor, 0, a);
                    }
                    if(up){
                        up = judgeMove(wall[i], actor, 0, -a);
                    }
                }
            }
        });
        this.addKeyListener(new KeyListener() {
            @Override
            public void keyTyped(KeyEvent e) {
            }
            @Override
            public void keyPressed(KeyEvent e) {
                if(e.getKeyCode() == 37 && left){
                    //left
                    actor.setBounds(new Rectangle(actor.getX() - a, actor.getY(), a, a));
                    right = true;
                }
                else{
                    echo("Cannot left");
                }
                if(e.getKeyCode() == 38 & up){
                    //up
                    actor.setBounds(new Rectangle(actor.getX(), actor.getY() - a, a, a));
                    down = true;
                }
                else{
                    echo("Cannot up");
                }
                if(e.getKeyCode() == 39 && right){
                    //right
                    actor.setBounds(new Rectangle(actor.getX() + a, actor.getY(), a, a));
                    left = true;
                }
                else{
                    echo("Cannot right");
                }
                if(e.getKeyCode() == 40 && down){
                    //down
                    actor.setBounds(new Rectangle(actor.getX(), actor.getY() + a, a, a));
                    up = true;
                }
                else{
                    echo("Cannot down");
                }
            }
            @Override
            public void keyReleased(KeyEvent e) {

            }
        });
        head.add(label);
        area.setLayout(new BorderLayout());
        area.add(panel, BorderLayout.CENTER);
        sub.setLayout(new BorderLayout());
        sub.add(Up, BorderLayout.NORTH);
        Up.addActionListener(e -> {
            if(up){
                actor.setBounds(new Rectangle(actor.getX(), actor.getY() - a, a, a));
                down = true;
            }
            else{
                echo("Cannot up");
            }
        });
        sub.add(Left, BorderLayout.WEST);
        Left.addActionListener(e -> {
            if(left){
                actor.setBounds(new Rectangle(actor.getX() - a, actor.getY(), a, a));
                right = true;
            }
            else{
                echo("Cannot left");
            }
        });
        sub.add(Right, BorderLayout.EAST);
        Right.addActionListener(e -> {
            if(right){
                actor.setBounds(new Rectangle(actor.getX() + a, actor.getY(), a, a));
                left = true;
            }
            else{
                echo("Cannot right");
            }
        });
        sub.add(Down, BorderLayout.SOUTH);
        Down.addActionListener(e -> {
            if(down){
                actor.setBounds(new Rectangle(actor.getX(), actor.getY() + a, a, a));
                down = true;
            }
            else{
                echo("Cannot down");
            }
        });
        contentPane.add(head, BorderLayout.NORTH);
        contentPane.add(area, BorderLayout.CENTER);
        contentPane.add(sub, BorderLayout.SOUTH);
    }
    public void echo(String message){
        label.setText(message);
    }
    public boolean judgeMove(Wall wall, Actor actor, int x, int y){
        boolean flag;
        flag = actor.getX() + x != wall.getX() || actor.getY() + y != wall.getY();
        return flag;
    }
    public static void main(String[] args) {
        new game("推箱子");
    }
}
class Star extends JPanel{
    @Override
    protected void paintComponent(Graphics g) {
        int width = this.getWidth();
        int height = this.getHeight();
        g.clearRect(0, 0, width, height);
        g.setColor(Color.yellow);
        g.fillOval(0, 0, width, height);
    }
}
class Wall extends JPanel{
    @Override
    public void paintComponent(Graphics g) {
        Border border = new LineBorder(Color.BLUE, 1);
        int width = this.getWidth();
        int height = this.getHeight();
        g.clearRect(0, 0, width, height);
        g.setColor(Color.red);
        g.fillRect(0, 0, width, height);
        this.setBorder(border);
    }
}
class Actor extends JPanel{
    @Override
    protected void paintComponent(Graphics g) {
        int width = this.getWidth();
        int height = this.getHeight();
        g.clearRect(0, 0, width, height);
        g.setColor(Color.green);
        g.fillRect(0, 0, width, height);
    }
}
class Box extends JPanel{
    @Override
    protected void paintComponent(Graphics g) {
        int width = this.getWidth();
        int height = this.getHeight();
        g.clearRect(0, 0, width, height);
        g.setColor(new Color(88, 87, 86));
        g.fillRect(0, 0, width, height);
    }
}