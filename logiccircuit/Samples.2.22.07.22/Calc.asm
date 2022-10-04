; Calculator program
; To compile this you will need to download latest Fusion.zip from https://github.com/eugenelepekhin/Fusion/releases

include "Assembler.txt"

; Memory map
macro Result	{ 0x8000 }			; Result port address. This port and Result + 1 is served as output to display number to user.
macro SignPort	{ 0x8002 }			; Port to write sign of the result
macro KeyPort	{ 0x8003 }			; Port to read pressed key

; Key detection masks
macro KeyPressed	{ 0x8000 }		; Mask to get flag showing if any key is pressed
macro KeyNumber		{ 0x0F }		; Number of pressed key. This number needs to be translated to action or number

atomic macro JMP address {
	li	r0, address
	j	r0
}

; Jump if Sign flag is set
atomic macro JS address {
	li	r0, address
	js	r0
}

; Jump if Sign flag does not set
atomic macro JNS address {
	li	r0, address
	jns	r0
}

; Jump if the result is zero
atomic macro JZ address {
	li	r0, address
	jz	r0
}

; Call subroutine which address is stored in provided register
atomic macro CALL r {
	si	rF			; save return address to rF register
	j	r
}


atomic macro RET {
	li	r0, 2		; Add 2 to address of return to get actual return address
	add	rF, r0		; CALL macro will place return address to rF register
	j	rF
}

; Copies pair of registers b and b+1 to pair of registers a and a+1
atomic macro MOV a, b {
	mr	a, b
	mr	a + 1, b + 1
}

; Left shifts pair of registers a and a+1
atomic macro LS a {
	ls	a
	rl	a + 1
}

; Right shifts pair of registers a and a+1
atomic macro RS a {
	rs	a + 1
	rr	a
}

atomic macro ADD a, b {
	add	a, b
	adc	a + 1, b + 1
}

atomic macro SUB a, b {
	sub	a, b
	sbc	a + 1, b + 1
}

; Zeros pair of registers r and r+1
atomic macro ZR r {
	zr	r
	zr	r + 1
}

; Negates pair of registers r and r+1
macro NEG r {
	li	r0, 0xFFFF
	xor	r, r0
	xor	r + 1, r0
	li	r0, 1
	add	r, r0
	zr	r0
	adc	r + 1, r0
}

; Saves pair of registers to port and port+1
macro Save r, address {
	li	r0, address
	sd	r, r0
	li	r0, address + 1
	sd	r + 1, r0
}

; Reads key pressed and released by user
macro ReadKey {
	li	r3, KeyPort		; address of key port
	li	r0, KeyPressed	; mask to check if any key is pressed
	li	r4, loop1
loop1:
	ld	r1, r3			; r1 = mem[r3] - read pressed key
	mr	r2, r0			; mask to check if any key is pressed
	and	r2, r1			; r2 = r2 & r1
	jz	r4				; loop1 until a key is pressed
	; r1 contains code of pressed key and mask of pressing.
	li	r9, KeyNumber	; mask to get key #
	and	r9, r1			; r9 contains # of key pressed
	; now wait until the key is released
	li	r4, loop0
loop0:
	ld	r1, r3			; r1 = mem[r3] - read pressed key
	mr	r2, r0			; mask to check if any key is pressed
	and	r2, r1			; r2 = r2 & r1
	jnz	r4				; loop0 until a key is released
}

macro main {
	li	rE, AddExecution	; Register rE will always hold operation that needs to be executed. This will play a role of stack with two arguments and operation

readKey:
	ReadKey
	; r9 has key code
	li	r0, KeyMapTable
	add	r0, r9
	ld	r0, r0
	j	r0

AddDigit:
	; r9 contains digit to add
	MOV	r7, rA			;save rA in case of overflow
	li	r1, AddDigitOverflow
	LS	rA
	js	r1				;restore rA-rB in case of overflow
	MOV	r5, rA
	LS	rA
	js	r1				;restore rA-rB in case of overflow
	LS	rA
	js	r1				;restore rA-rB in case of overflow
	ADD	rA, r5
	js	r1				;restore rA-rB in case of overflow
	zr	r0
	add	rA, r9
	adc	rB, r0
	js	r1				;restore rA-rB in case of overflow

	Save rA, Result
	zr	r0				;sign displayed here should always be +
	li	r1, SignPort
	sd	r0, r1
	JMP	readKey

AddDigitOverflow:
	MOV	rA, r7			; restore good number
	JMP	readKey;

EqualOperation:
	CALL rE
	li	rE, EqualExecution
	JMP	SaveRcResult

EqualExecution:
	ZR	rA
	RET

AddOperation:
	CALL rE
	li	rE,	AddExecution
	JMP	SaveRcResult

AddExecution:
	ADD	rC, rA
	ZR	rA
	RET

SubOperation:
	CALL rE
	li	rE, SubExecution
	JMP	SaveRcResult

SubExecution:
	SUB	rC, rA
	ZR	rA
	RET

NegOperation:
	CALL rE
	li	rE,	AddExecution
	NEG	rC
	JMP	SaveRcResult

MulOperation:
	CALL rE
	li	rE, MulExecution
	JMP	SaveRcResult

MulExecution:
	MOV	r8, rC				; save one operand to r8, r9
	ZR	rC					; and zero the result in rC, rD
	li	r7, mulLoop
	li	r6, mulSkipAdd
mulLoop:
	RS	rA
	jnc	r6		;skip add
	ADD	rC, r8
mulSkipAdd:
	LS	r8
	mr	r0, rA
	add	r0, rB
	jnz	r7					; if rA, rB are not 0 then continue
	;ZR	rA					; its already 0
	RET

DivOperation:
	CALL rE
	li	rE, DivExecution
	JMP	SaveRcResult

DivExecution:
	sign r1, rD			;extract sign of both operands and set them to absolute values as the algorithm only works with positive numbers.
	JZ	divPositiveC
	NEG	rC
divPositiveC:
	sign r2, rB
	JZ	divPositiveA
	NEG	rA
divPositiveA:
	xor	r1, r2			; r1 = 0 if signs of both operands are equal
	ZR	r8				; r8, r9 will hold reminder
	li	r7, -32			; repeat 32 times
	li	r6, divLoop		; loop
divLoop:
	ls	rC				; left shift 4 register holding quotient and reminder rC, rD and r8, r9
	rl	rD
	rl	r8
	rl	r9
	MOV	r4, r8			; r4 = r8 - rA
	SUB	r4, rA
	JS	divEndLoop		; if(r8 - rA < 0) jump to end of the loop
	li	r0, 1			; else rC | 1
	or	rC, r0
	MOV	r8, r4			; r8 = r8 - rA
divEndLoop:
	li	r0, 1
	add	r7, r0			; count++
	jnz	r6
	; set correct sign of the result
	zr	r0
	cmp	r1, r0			; if signs of both operands were equal result is correct
	JZ divExit
	NEG	rC				; otherwise negate result
divExit:
	ZR	rA
	RET

SaveRcResult:
	sign r0, rD			; check sign of the result
	JS	SaveRcNegative
	Save rC, Result		; result is positive
	ZR	rA
	li	r0, SignPort
	sd	rA, r0			; set sign to +
	JMP	readKey

SaveRcNegative:
	MOV	r7, rC
	NEG	r7
	Save r7, Result
	li	r0, SignPort
	li	r1, 1			; set sign to -
	sd	r1, r0
	ZR	rA
	JMP	readKey

Key0:
	li	r9, 7
	JMP	AddDigit

Key1:
	li	r9, 4
	JMP	AddDigit

Key2:
	li	r9, 1
	JMP	AddDigit

Key4:
	li	r9, 8
	JMP	AddDigit

Key6:
	li	r9, 2
	JMP	AddDigit

Key7:
	li	r9, 0
	JMP	AddDigit

Key8:
	li	r9, 9
	JMP	AddDigit

Key9:
	li	r9, 6
	JMP	AddDigit

KeyA:
	li	r9, 3
	JMP	AddDigit

; map key # to operation and digit
KeyMapTable:
	Key0			; 7
	Key1			; 4
	Key2			; 2
	NegOperation	; +-
	Key4			; 8
	AddDigit		; 5
	Key6			; 2
	Key7			; 0
	Key8			; 9
	Key9			; 6
	KeyA			; 3
	EqualOperation	; B
	DivOperation	; C
	MulOperation	; D
	SubOperation	; E
	AddOperation	; F
}
