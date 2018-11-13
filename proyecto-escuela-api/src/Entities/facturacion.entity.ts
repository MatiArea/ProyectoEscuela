import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity() export class factura {
    @PrimaryGeneratedColumn()
    id : number;
  
    @Column()
    numero: number;
    
    @Column('float')
    total : number;

  }

  @Entity() export class facturaDetalle {
    @PrimaryGeneratedColumn()
    id : number;
  
    @Column()
    cantidad: number;
    
    @Column('float')
    subTotal : number;

  }

  @Entity() export class arancel {
    @PrimaryGeneratedColumn()
    id : number;
  
    @Column('date')
    fechaEmision: string;
    
    @Column('date')
    fechaVencimiento : string;

    @Column('float')
    total : number;

  }

  @Entity() export class concepto {
    @PrimaryGeneratedColumn()
    id : number;
  
    @Column()
    codigo: string;
    
    @Column()
    nombre : string;

    @Column('float')
    porcentajeDescuento : number;

    @Column('float')
    valor : number;

  }

  @Entity() export class conceptoCuota {
    @PrimaryGeneratedColumn()
    id : number;
  
  }

  @Entity() export class cuota {
    @PrimaryGeneratedColumn()
    id : number;
  
    @Column()
    estado: string;

    @Column('date')
    fechaEmision: string;

    @Column()
    monto: number;

    @Column()
    numero: number;

  }

  @Entity() export class pago {
    @PrimaryGeneratedColumn()
    id : number;
  
    @Column('date')
    fecha: string;

    @Column()
    monto: number;

    @Column()
    tipo: string;

  }

  @Entity() export class estadoCuota {
    @PrimaryGeneratedColumn()
    id : number;
  
    @Column()
    nombre: string;

  }

  @Entity() export class tipoPago {
    @PrimaryGeneratedColumn()
    id : number;
  
    @Column()
    nombre: string;

  }

  @Entity() export class arancelDetalle {
    @PrimaryGeneratedColumn()
    id : number;
  
    @Column('float')
    subtotal: number;

    @Column()
    cantidad: number;

  }

  @Entity() export class conceptoDetalle {
    @PrimaryGeneratedColumn()
    id : number;
  
    @Column('float')
    porcentajeDescuento: number;

  }

  @Entity() export class valorArancel {
    @PrimaryGeneratedColumn()
    id : number;
  
  }
