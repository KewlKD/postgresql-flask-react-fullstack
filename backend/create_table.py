import psycopg2

#Establishing the connection
conn = psycopg2.connect(
   database="testdb2", user='postgres', password='', host='localhost', port= '5432'
)
#Creating a cursor object using the cursor() method
cursor = conn.cursor()

#Doping EMPLOYEE table if already exists.
cursor.execute("DROP TABLE IF EXISTS EMPLOYEE")

#Creating table as per requirement
sql ='''CREATE TABLE EMPLOYEE(
    id INT NOT NULL,
    firstname CHAR(20),
    lastname CHAR(20),
    date DATE,
    PRIMARY KEY (id)
   
)'''
cursor.execute(sql)
print("Table created successfully........")
conn.commit()
#Closing the connection
conn.close()